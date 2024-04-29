import { MakeEnumValue, MakeVariant, MarcoMatch } from "src";

type _Action =
  | MakeVariant<"Value">
  | MakeVariant<"Run", number>
  | MakeVariant<"Code", {
    language:
      | MakeVariant<"Rust">
      | MakeVariant<"Python">;
  }>;

function makePattern(action: _Action): string {
  const match = MarcoMatch.new(action);

  return match.caseOf({
    Code: ({ language }) => {
      const match = MarcoMatch.new(language);
      return match.caseOf({
        Rust: () => "I am codding rust",
        Python: () => "I am codding python",
      });
    },
    Run: (d) => `Running ${d}`,
    Value: () => `Value`,
  });
}

console.log(makePattern({ Code: { language: MakeEnumValue("Rust") } }));
