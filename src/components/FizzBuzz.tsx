export default function FizzBuzz() {
  const items = Array.from({ length: 100 }, (_, index) => {
    const num = index + 1;

    if (num % 3 === 0 && num % 5 === 0) {
      return { value: num, label: "FizzBuzz", type: "fizzbuzz" };
    }
    if (num % 3 === 0) {
      return { value: num, label: "Fizz", type: "fizz" };
    }
    if (num % 5 === 0) {
      return { value: num, label: "Buzz", type: "buzz" };
    }
    return { value: num, label: String(num), type: "number" };
  });

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Tugas 1 — FizzBuzz (1 - 100)</h2>
        <p className="subtitle">
          Kelipatan 3: Fizz &bull; Kelipatan 5: Buzz &bull; Kelipatan 3 &amp; 5:
          FizzBuzz
        </p>
      </div>

      <div className="fizzbuzz-grid">
        {items.map((item) => (
          <div key={item.value} className={`fb-cell fb-${item.type}`}>
            <span className="fb-index">{item.value}</span>
            <span className="fb-label">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
