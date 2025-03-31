import { Button } from "@/components/ui/button";

const stats = [
  "Fuerza",
  "Destreza",
  "Constitución",
  "Inteligencia",
  "Sabiduría",
  "Carisma",
];

// Función para calcular el modificador de un stat
const getModifier = (stat: number) => Math.floor((stat - 10) / 2);

export default function StatsBlock({
  statsValues = {
    Fuerza: 10,
    Destreza: 10,
    Constitución: 10,
    Inteligencia: 10,
    Sabiduría: 10,
    Carisma: 10,
  },
  onChange,
}: {
  statsValues: Record<string, number>;
  onChange: (newStats: Record<string, number>) => void;
}) {
  const handleStatChange = (stat: string, delta: number) => {
    const newValue = (statsValues?.[stat] || 10) + delta;
    if (newValue < 1 || newValue > 30) return;

    if (onChange) {
      onChange({ ...statsValues, [stat]: newValue });
    } else {
      console.warn("⚠️ onChange no está definido");
    }
  };
  return (
    <div className="grid gap-4">
      {stats.map((stat) => {
        const value = statsValues?.[stat] || 10;
        const modifier = getModifier(value);
        const modifierColor =
          modifier > 0
            ? "text-green-500"
            : modifier < 0
            ? "text-red-500"
            : "text-gray-500";

        return (
          <div
            key={stat}
            className="flex items-center justify-between border p-3 rounded-lg shadow-md"
          >
            <span className="font-semibold w-28">{stat}</span>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => handleStatChange(stat, -1)}
                disabled={value === 1}
              >
                -
              </Button>
              <span className="w-10 text-center text-lg font-bold">
                {value}
              </span>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => handleStatChange(stat, 1)}
                disabled={value === 30}
              >
                +
              </Button>
              <span
                className={`w-12 text-center font-semibold ${modifierColor}`}
              >
                {modifier >= 0 ? `+${modifier}` : modifier}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
