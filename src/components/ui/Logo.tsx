import Image from "next/image";
import { basePath } from "@/lib/base-path";

export function Logo({ size = 40, withWordmark = true }: { size?: number; withWordmark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <Image
        src={`${basePath}/brand/logo.jpg`}
        alt="The Paw Curry Bowl"
        width={size}
        height={size}
        className="rounded-full shadow-soft shrink-0"
      />
      {withWordmark && (
        <span className="font-display text-lg leading-tight text-paw-green-dark tracking-tight">
          The Paw<br className="hidden" /> Curry Bowl
        </span>
      )}
    </div>
  );
}
