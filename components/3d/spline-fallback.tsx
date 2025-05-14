"use client";

interface SplineFallbackProps {
  scene: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function SplineFallback({
  scene,
  className = "",
  style,
}: SplineFallbackProps) {
  return (
    <div className={className} style={style}>
      <iframe
        src={scene}
        frameBorder="0"
        width="100%"
        height="100%"
        title="Spline Scene"
        style={{
          border: "none",
          outline: "none",
          ...style,
        }}
      />
    </div>
  );
}
