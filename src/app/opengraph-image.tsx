import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Fenvolt — Engineering capacity for the hard parts.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [archivo, chip, answer] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/fonts/Archivo-Medium.woff")),
    readFile(join(process.cwd(), "public/brand/fenvolt-chip.png")),
    readFile(join(process.cwd(), "public/work/specter-answer.jpg")),
  ]);

  const chipSrc = `data:image/png;base64,${chip.toString("base64")}`;
  const answerSrc = `data:image/jpeg;base64,${answer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#efede7",
          padding: "44px 56px 40px",
          fontFamily: "Archivo",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(239,237,231,0.16)",
            paddingBottom: 18,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={chipSrc} alt="" width={36} height={36} />
            <span style={{ fontSize: 24, letterSpacing: "-0.03em", fontWeight: 600 }}>
              Fenvolt
            </span>
          </div>
          <span
            style={{
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(239,237,231,0.58)",
            }}
          >
            Engineering company · Lahore
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 40 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 640,
              fontSize: 82,
              lineHeight: 0.94,
              letterSpacing: "-0.055em",
              fontWeight: 500,
            }}
          >
            <span>Engineering</span>
            <span>capacity for</span>
            <span style={{ color: "#4a4945" }}>the hard parts.</span>
            <span
              style={{
                marginTop: 28,
                fontSize: 17,
                lineHeight: 1.5,
                letterSpacing: "-0.01em",
                fontWeight: 400,
                color: "rgba(239,237,231,0.66)",
                width: 470,
              }}
            >
              Retrieval, document intelligence and agent workflows, built by the
              engineers who scoped them.
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 388,
              border: "1px solid rgba(239,237,231,0.18)",
              padding: 12,
              background: "#111110",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 2px 10px",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(239,237,231,0.6)",
              }}
            >
              <span>SPECTER / cited answer</span>
              <span style={{ color: "#efede7" }}>Fig. 00</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={answerSrc}
              alt=""
              width={362}
              height={222}
              style={{
                width: 362,
                height: 222,
                objectFit: "cover",
                objectPosition: "top left",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 2px 0",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(239,237,231,0.6)",
              }}
            >
              <span>Claim → source page</span>
              <span>10 checked</span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", width: 56, height: 1, background: "rgba(239,237,231,0.5)" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              fontSize: 12,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(239,237,231,0.55)",
            }}
          >
            <span>Retrieval · Document intelligence · Agent workflows</span>
            <span>fenvolt.com</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Archivo",
          data: archivo,
          style: "normal",
          weight: 500,
        },
      ],
    },
  );
}
