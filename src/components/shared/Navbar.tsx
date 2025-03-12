'use client';
import Logo from '@/assets/svgs/Logo';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { logout } from '@/services/AuthService';
import { useUser } from '@/context/UserContext';
import { usePathname, useRouter } from 'next/navigation';
import { protectedRoutes } from '@/constants';
import Container from '../ui/core/Container';

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some(route => pathname.match(route))) {
      router.push('/');
    }
  };

  return (
    <Container>
      <header className="border-b bg-background w-full sticky top-0 z-10">
        <div className="container flex justify-between items-center mx-auto h-16 px-5">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="flex gap-2">
            {user?.email ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="bg-red-500 cursor-pointer" onClick={handleLogOut}>
                      <LogOut />
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link href="/login">
                <Button className="rounded-full" variant="outline">
                  Login
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </header>
    </Container>
  );
}
