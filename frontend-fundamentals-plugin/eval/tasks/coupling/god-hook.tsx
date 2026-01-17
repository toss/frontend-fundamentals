// EVAL TASK: Coupling - God Hook
// Expected: Identify that useUser does too much, changes to any feature affect entire hook

function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [preferences, setPreferences] = useState<Preferences>({});
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetchUser().then(setUser).catch(setError).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (user) {
      fetchPreferences(user.id).then(setPreferences);
      fetchNotifications(user.id).then(setNotifications);
      fetchFriends(user.id).then(setFriends);
      fetchPosts(user.id).then(setPosts);
      fetchMessages(user.id).then(setMessages);
    }
  }, [user?.id]);

  const updatePreferences = async (prefs: Partial<Preferences>) => {
    await savePreferences(prefs);
    setPreferences((prev) => ({ ...prev, ...prefs }));
  };

  const markNotificationRead = async (id: string) => {
    await markRead(id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const sendMessage = async (to: string, content: string) => {
    const msg = await postMessage(to, content);
    setMessages((prev) => [...prev, msg]);
  };

  return {
    user,
    loading,
    error,
    preferences,
    notifications,
    friends,
    posts,
    messages,
    updatePreferences,
    markNotificationRead,
    sendMessage,
  };
}
