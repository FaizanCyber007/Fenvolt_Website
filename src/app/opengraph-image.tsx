import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Fenvolt — Engineering capacity for the hard parts.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [regular, italic, chip, citation] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/fonts/InstrumentSerif-Regular.ttf")),
    readFile(join(process.cwd(), "src/assets/fonts/InstrumentSerif-Italic.ttf")),
    readFile(join(process.cwd(), "public/brand/fenvolt-chip.png")),
    readFile(join(process.cwd(), "public/work/specter-citation.jpg")),
  ]);

  const chipSrc = `data:image/png;base64,${chip.toString("base64")}`;
  const citationSrc = `data:image/jpeg;base64,${citation.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#06090d",
          color: "#f3f6f5",
          padding: "52px 64px 44px",
          fontFamily: "Instrument",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(243,246,245,0.14)",
            paddingBottom: 22,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={chipSrc} alt="" width={42} height={42} style={{ borderRadius: 8 }} />
            <span style={{ fontSize: 29, letterSpacing: "-0.02em" }}>Fenvolt</span>
          </div>
          <span
            style={{
              fontSize: 14,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(243,246,245,0.55)",
            }}
          >
            AI engineering · Engineering capacity
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 46 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 70,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              width: 610,
            }}
          >
            <span>Engineering capacity</span>
            <span>
              <span>for the&#160;</span>
              <span style={{ fontStyle: "italic", color: "#7de9f7" }}>hard</span>
              <span>&#160;parts.</span>
            </span>
            <span
              style={{
                marginTop: 30,
                fontSize: 17,
                lineHeight: 1.5,
                letterSpacing: "0",
                color: "rgba(243,246,245,0.62)",
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
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.04)",
              padding: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 4px 9px",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(243,246,245,0.5)",
              }}
            >
              <span>SPECTER / citation viewer</span>
              <span style={{ color: "#7de9f7" }}>build</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={citationSrc}
              alt=""
              width={368}
              height={230}
              style={{
                width: 368,
                height: 230,
                objectFit: "cover",
                objectPosition: "top",
                borderRadius: 6,
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 4px 2px",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(243,246,245,0.55)",
              }}
            >
              <span>Claim → page 16</span>
              <span style={{ color: "#7de9f7" }}>1 : 1</span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", width: 68, height: 3, background: "#22d3ee" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              fontSize: 14,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(243,246,245,0.55)",
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
          name: "Instrument",
          data: regular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Instrument",
          data: italic,
          style: "italic",
          weight: 400,
        },
      ],
    },
  );
}
