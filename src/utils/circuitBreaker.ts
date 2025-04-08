type CircuitState = "CLOSED" | "OPEN" | "HALF_OPEN";

let failures: number[] = [];
let state: CircuitState = "CLOSED";
let lastProbe = 0;

const FAILURE_THRESHOLD = 3;
const TIME_WINDOW = 30_000;
const COOLDOWN_PERIOD = 10_000;

export function recordFailure() {
  console.log({ state });
  const now = Date.now();

  // If we're half-open, one failure should trip the circuit right away.
  if (state === "HALF_OPEN") {
    state = "OPEN";
    console.warn("Circuit breaker re-tripped during HALF_OPEN!");
    return;
  }

  failures.push(now);
  failures = failures.filter((t) => now - t <= TIME_WINDOW);

  if (failures.length >= FAILURE_THRESHOLD) {
    state = "OPEN";
    console.warn("Circuit breaker tripped!");
  }
}

export function recordSuccess() {
  state = "CLOSED";
  failures = [];
}

export function shouldTrip() {
  console.log({ state });
  const now = Date.now();

  if (state === "CLOSED") return false;

  if (state === "OPEN") {
    if (now - lastProbe > COOLDOWN_PERIOD) {
      state = "HALF_OPEN";
      failures = [];
      lastProbe = now;
      return false;
    }
    return true;
  }

  return false;
}
