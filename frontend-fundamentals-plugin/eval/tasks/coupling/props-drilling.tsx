// EVAL TASK: Coupling - Props Drilling
// Expected: Identify props drilling, suggest composition pattern or context

interface User {
  id: string;
  name: string;
  avatar: string;
}

function App() {
  const user = useCurrentUser();
  return <Page user={user} />;
}

function Page({ user }: { user: User }) {
  return (
    <Layout user={user}>
      <Content user={user} />
    </Layout>
  );
}

function Layout({ user, children }: { user: User; children: React.ReactNode }) {
  return (
    <div>
      <Header user={user} />
      <Sidebar user={user} />
      {children}
    </div>
  );
}

function Header({ user }: { user: User }) {
  return <header><UserMenu user={user} /></header>;
}

function Sidebar({ user }: { user: User }) {
  return <aside><Avatar user={user} /></aside>;
}

function Content({ user }: { user: User }) {
  return <main><UserProfile user={user} /></main>;
}

function Avatar({ user }: { user: User }) {
  return <img src={user.avatar} alt={user.name} />;
}

function UserMenu({ user }: { user: User }) {
  return <div>Welcome, {user.name}</div>;
}

function UserProfile({ user }: { user: User }) {
  return <div>{user.name}'s Profile</div>;
}
