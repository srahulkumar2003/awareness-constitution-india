export default function BackgroundAnimation({ variant = "light" }) {
  return (
    <div className={`background-layer ${variant}`} aria-hidden="true">
      <div className="flag-wave" />
      <div className="chakra-watermark">☸</div>
      <div className="gold-particles">
        {Array.from({ length: 24 }).map((_, index) => (
          <span key={index} style={{ "--i": index }} />
        ))}
      </div>
      <div className="article-rain">
        <span>Article 14</span><span>Article 19</span><span>Article 21</span><span>Article 32</span><span>Article 51A</span>
      </div>
    </div>
  );
}
