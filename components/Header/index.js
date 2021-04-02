import Link from "next/link";
import { useRouter } from "next/router";
import { Container, LinkText } from "./styles";

const Header = () => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <Container>
      <Link href="/">
        <a>
          <LinkText isActive={pathname === "/" && "is-active"}>Home</LinkText>
        </a>
      </Link>
      <Link href="/about">
        <a>
          <LinkText isActive={pathname === "/about" && "is-active"}>
            About
          </LinkText>
        </a>
      </Link>
    </Container>
  );
};

export default Header;
