import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import TextType from "../components/TextType";
import { Button } from "../components/ui/button";
import { albumCovers } from "../constants/constants";
import React, { Suspense, useRef, useState } from "react";
import VariableProximity from "../components/VariableProximity";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";
import LazyImage from "@/components/LazyImage";
import { Loader2Icon } from "lucide-react";
import SongsDropdown from "@/components/SongsDropdown";

const MainPage = () => {
  const containerRef = useRef(null);
  const startRef = useRef<HTMLDivElement>(null);
  const [song, setSong] = useState("");
  const [debouncedSong] = useDebounce(song, 500);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSong(e.target.value);
  };


  return (
    <>
      <div className="min-h-screen overflow-hidden w-full bg-background relative text-foregorund bg-gradient-to-b from-[#1ed75f1e] to-transparent after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:bg-gradient-to-t after:opacity-90 after:from-[#090909] after:h-26 after:z-20 after:to-transparent">
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
          repeating-linear-gradient(45deg, rgba(0, 255, 128, 0.1) 0, rgba(0, 255, 128, 0.1) 1px, transparent 1px, transparent 20px),
          repeating-linear-gradient(-45deg, rgba(0, 255, 128, 0.1) 0, rgba(0, 255, 128, 0.1) 1px, transparent 1px, transparent 20px)
        `,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute left-5 top-0 z-2 hidden md:block">
          <InfiniteSlider speedOnHover={200} gap={24} direction="vertical">
            {albumCovers.map((item) => (
              <LazyImage
                src={item}
                className="aspect-square w-[120px] h-[120px] rounded-[4px] object-cover"
              />
            ))}
          </InfiniteSlider>
        </div>
        <div className="absolute top-[45%] px-10 md:px-5 text-center space-y-5 left-1/2 w-full transform -translate-x-1/2 -translate-y-1/2">
          <TextType
            text={["All the songs you need", "in one place", "and for free"]}
            textColors={["#fff", "#fff", " var(--primary)"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="●"
          />
          <div
            ref={containerRef}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "600px",
              marginInline: "auto",
            }}
          >
            <VariableProximity
              label={
                "Musico is a free music player where you can listen to your favorite songs."
              }
              className={"variable-proximity-demo"}
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={containerRef}
              radius={100}
              falloff="linear"
            />
          </div>
          <div className="flex justify-center gap-5 mt-7">
            <Button
              size={"lg"}
              className="px-10 py-5.5"
              onClick={() => {
                if (startRef.current)
                  startRef.current.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get Started
            </Button>
            <Button
              size={"lg"}
              variant="secondary"
              className="border border-primary px-10 py-5.5"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="absolute right-5 top-0 z-2 hidden md:block">
          <InfiniteSlider
            speedOnHover={200}
            gap={24}
            direction="vertical"
            reverse
          >
            {albumCovers.map((item) => (
              <img
                src={item}
                alt="Dean blunt - Black Metal 2"
                className="aspect-square w-[120px] h-[120px] rounded-[4px] object-cover"
              />
            ))}
          </InfiniteSlider>
        </div>
      </div>{" "}
      <div className="min-h-screen py-20" ref={startRef}>
        <div className="max-w-6xl mx-auto px-5 relative">
          <Input
            placeholder="Enter the song name..."
            className="p-5"
            onChange={handleChange}
          />
          <Suspense
            fallback={
              <div className="mt-15 w-full flex justify-center">
                <Loader2Icon className="animate-spin text-primary" />
              </div>
            }
          >
            <SongsDropdown debouncedSong={debouncedSong} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default MainPage;
