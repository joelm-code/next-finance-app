import Typewriter from "typewriter-effect";
import React from "react";

export const TypewritterEffect = () => {
  return (
    <>
      <Typewriter
        options={{
          strings: [
            "Buying a new phone",
            "Planning your retirement",
            "Buying your first home",
            "Planning your child's education",
            "Buying your dream car",
          ],
          autoStart: true,
          loop: true,
        }}
      />
    </>
  );
};
