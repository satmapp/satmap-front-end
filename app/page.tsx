export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", color: "#f97316" }}>SatMap ⚡</h1>
      <p style={{ marginTop: "1rem", fontSize: "1.25rem" }}>
        Mapa comunitario de comercios Bitcoin-friendly
      </p>
    </main>
  );
}
