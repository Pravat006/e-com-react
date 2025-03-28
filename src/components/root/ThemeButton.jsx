import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const ThemeButton = ({
  className=""
}) => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
    className={` flex items-center justify-center px-3 py-2 text-xl  rounded-[50px]  ${className} ml-1`}
      variant="outline"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
     
    </Button>
  );
};

export default ThemeButton;
