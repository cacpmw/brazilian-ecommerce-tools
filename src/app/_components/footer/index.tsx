"use client";

export default function Footer() {
  return (
    <div
      id="footer"
      className="flex flex-col items-center bg-dark-background py-20"
    >
      <p className="text-sm text-gray-400 ">
        Desenvolvido por{" "}
        <a
          className="hover:text-gray-200"
          href="https://www.github.com/cacpmw"
          target="_blank"
        >
          Carlos Carneiro
        </a>
      </p>
    </div>
  );
}
