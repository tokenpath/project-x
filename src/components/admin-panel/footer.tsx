export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center justify-between">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground">
          &copy; {currentYear} Profile <span className="text-primary">X</span>. All rights reserved.
        </p>
        <p className="text-xs md:text-sm leading-loose text-muted-foreground">
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
}
