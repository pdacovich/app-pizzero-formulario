import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { parseSurveySubmission } from "@/features/survey/schema";
import { buildSubmissionInsert, deriveContactFlags } from "@/features/survey/utils";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsedSubmission = parseSurveySubmission(payload);

    if (!parsedSubmission.success) {
      return NextResponse.json(
        {
          error: parsedSubmission.error.issues[0]?.message ?? "Los datos enviados no son válidos."
        },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdminClient() as any;
    const responseInsert = buildSubmissionInsert(parsedSubmission.data);

    const { data: insertedResponse, error: responseError } = await supabase
      .from("survey_responses")
      .insert(responseInsert)
      .select("*")
      .single();

    if (responseError || !insertedResponse) {
      throw responseError ?? new Error("No pudimos guardar la respuesta.");
    }

    let betaCandidateId: string | null = null;
    const contactFlags = deriveContactFlags(parsedSubmission.data.contact_permission);

    if (insertedResponse.is_beta_candidate) {
      const { data: betaCandidate, error: betaCandidateError } = await supabase
        .from("beta_candidates")
        .insert({
          survey_response_id: insertedResponse.id,
          full_name: insertedResponse.full_name,
          email: insertedResponse.email || null,
          whatsapp: insertedResponse.whatsapp || null,
          role_type: insertedResponse.role_type,
          business_stage: insertedResponse.business_stage,
          preferred_contact_channels: [
            ...(contactFlags.contact_via_email ? ["email"] : []),
            ...(contactFlags.contact_via_whatsapp ? ["whatsapp"] : [])
          ]
        })
        .select("id")
        .single();

      if (betaCandidateError) {
        throw betaCandidateError;
      }

      betaCandidateId = betaCandidate.id;
    }

    const outboundEvents = [];

    if (contactFlags.contact_via_email && insertedResponse.email) {
      outboundEvents.push({
        survey_response_id: insertedResponse.id,
        beta_candidate_id: betaCandidateId,
        event_type: "thank_you_email_pending",
        status: "pending",
        payload: {
          full_name: insertedResponse.full_name,
          email: insertedResponse.email
        }
      });
    }

    if (insertedResponse.is_beta_candidate) {
      outboundEvents.push({
        survey_response_id: insertedResponse.id,
        beta_candidate_id: betaCandidateId,
        event_type: "beta_invite_candidate",
        status: "pending",
        payload: {
          beta_interest: insertedResponse.beta_interest,
          role_type: insertedResponse.role_type,
          business_stage: insertedResponse.business_stage
        }
      });

      outboundEvents.push({
        survey_response_id: insertedResponse.id,
        beta_candidate_id: betaCandidateId,
        event_type: "internal_follow_up",
        status: "pending",
        payload: {
          source_channel: insertedResponse.source_channel,
          main_pain_point: insertedResponse.main_pain_point
        }
      });
    }

    if (outboundEvents.length > 0) {
      const { error: outboundEventError } = await supabase.from("outbound_events").insert(outboundEvents);

      if (outboundEventError) {
        throw outboundEventError;
      }
    }

    return NextResponse.json({
      success: true,
      id: insertedResponse.id
    });
  } catch (error) {
    console.error("[survey-submit]", error);

    return NextResponse.json(
      {
        error: "No pudimos procesar la respuesta en este momento."
      },
      { status: 500 }
    );
  }
}
