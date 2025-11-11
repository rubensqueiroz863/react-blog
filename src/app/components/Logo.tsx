import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image 
        src="https://i.postimg.cc/50cK06nC/pngtree-paper-icon-png-image-6294297.png"
        alt="Logo do blog"
        width={100}
        height={100}
        className="w-11 object-contain"
      />
    </Link>
  );
}