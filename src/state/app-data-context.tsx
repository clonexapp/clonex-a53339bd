import { useEffect, useMemo, useState, type ReactNode } from "react";

import type { AppData } from "@/domain/types";
import { localAppRepository } from "@/repositories/local-app-repository";
import { AppDataContext, type AppDataContextValue } from "@/state/app-data-context-value";

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData | null>(null);

  useEffect(() => {
    void localAppRepository.load().then(setData);
  }, []);

  function update(updater: (current: AppData) => AppData) {
    setData((current) => {
      if (!current) return current;
      const next = updater(current);
      void localAppRepository.save(next);
      return next;
    });
  }

  const value = useMemo<AppDataContextValue>(
    () => ({
      data,
      addCapture(input) {
        update((current) => ({
          ...current,
          captures: [
            {
              id: crypto.randomUUID(),
              personId: "p1",
              status: "pendente",
              recordedAt: new Date().toISOString(),
              ...input,
            },
            ...current.captures,
          ],
        }));
      },
      addEquipment(input) {
        update((current) => ({
          ...current,
          equipment: [
            ...current.equipment,
            { id: crypto.randomUUID(), status: "disponivel", ...input },
          ],
        }));
      },
      updateCaptureStatus(id, status) {
        update((current) => ({
          ...current,
          captures: current.captures.map((capture) =>
            capture.id === id ? { ...capture, status } : capture,
          ),
        }));
      },
      updatePersonGoal(id, goalHours) {
        update((current) => ({
          ...current,
          people: current.people.map((person) =>
            person.id === id ? { ...person, goalHours: Math.max(0, goalHours) } : person,
          ),
        }));
      },
      markNoticesRead(role) {
        update((current) => ({
          ...current,
          notices: current.notices.map((notice) =>
            notice.role === role ? { ...notice, read: true } : notice,
          ),
        }));
      },
      async resetDemo() {
        setData(await localAppRepository.reset());
      },
    }),
    [data],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}
