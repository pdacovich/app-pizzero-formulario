import { HomeExperience } from "@/features/survey/home-experience";

interface HomePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function parseSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;

  return (
    <HomeExperience
      tracking={{
        source: parseSearchParam(params.source),
        utm_source: parseSearchParam(params.utm_source),
        utm_medium: parseSearchParam(params.utm_medium),
        utm_campaign: parseSearchParam(params.utm_campaign),
        utm_content: parseSearchParam(params.utm_content),
        ref: parseSearchParam(params.ref)
      }}
    />
  );
}
