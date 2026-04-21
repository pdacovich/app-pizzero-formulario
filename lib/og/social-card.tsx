/* eslint-disable @next/next/no-img-element */
import metodoDacovichLogo from "@/images/Logo Metodo Dacovich - Gris.png";

export function createSocialCardMarkup() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background:
          "radial-gradient(circle at 18% 10%, rgba(30,115,190,0.18), transparent 28%), radial-gradient(circle at 88% 84%, rgba(196,167,110,0.14), transparent 24%), linear-gradient(180deg, #f8f6f1 0%, #f1eee8 100%)",
        color: "#111111",
        padding: "48px",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "18px",
          borderRadius: "34px",
          border: "1px solid rgba(17,17,17,0.04)"
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          borderRadius: "32px",
          background: "rgba(255,255,255,0.9)",
          border: "1px solid rgba(255,255,255,0.78)",
          boxShadow: "0 24px 60px rgba(17,17,17,0.08)",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "0 auto auto 0",
            width: "100%",
            height: "9px",
            background: "linear-gradient(90deg, #1e73be 0%, #7ab2e0 48%, #d1b483 100%)"
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            padding: "46px 46px 0 46px"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}
            >
              <img
                src={metodoDacovichLogo.src}
                alt="Metodo Dacovich"
                width="194"
                height="52"
                style={{
                  objectFit: "contain"
                }}
              />
              <div
                style={{
                  display: "flex",
                  color: "#1e73be",
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase"
                }}
              >
                Investigacion de producto
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "999px",
                border: "1px solid rgba(17,17,17,0.08)",
                background: "#f7f8fb",
                color: "#5f6470",
                fontSize: 20,
                padding: "12px 20px"
              }}
            >
              formulario.metododacovich.com
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              maxWidth: "860px"
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 68,
                lineHeight: 1.02,
                letterSpacing: "-0.06em",
                fontWeight: 800
              }}
            >
              Estamos disenando una herramienta pensada para el mundo pizzero
            </div>

            <div
              style={{
                display: "flex",
                maxWidth: "760px",
                color: "#5f6470",
                fontSize: 28,
                lineHeight: 1.42
              }}
            >
              Formulario publico para detectar dolores reales, validar interes en una beta y
              construir una herramienta util para Pizzeros y duenos de Pizzeria.
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
            padding: "0 46px 46px 46px"
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "14px"
            }}
          >
            {["2 a 3 minutos", "Una pregunta por pantalla", "Optimizado para celular"].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "999px",
                  border: "1px solid #d8dde7",
                  background: "#f7f8fb",
                  color: "#5f6470",
                  fontSize: 22,
                  padding: "14px 20px"
                }}
              >
                {item}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "999px",
              background: "#1e73be",
              color: "#ffffff",
              fontSize: 27,
              fontWeight: 700,
              padding: "18px 28px",
              boxShadow: "0 14px 30px rgba(30,115,190,0.24)"
            }}
          >
            Responder formulario
          </div>
        </div>
      </div>
    </div>
  );
}
