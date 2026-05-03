"use client";

export function TryOnJumpButton() {
  const jump = () => {
    const target = document.getElementById("virtual-try-on");
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    target.focus();
  };

  return (
    <button
      type="button"
      onClick={jump}
      className="btn-secondary flex w-full items-center justify-center gap-2 py-4 text-sm font-medium"
    >
      <span>Try it on</span>
      <span className="material-symbols-outlined text-[18px]">face</span>
    </button>
  );
}
