
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useState } from 'react';

function NotificationsPage() {
  const { themeClasses } = useTheme();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'like',
      username: 'ArtistSoul',
      content: 'liked your sketch "Morning Inspiration"',
      timeAgo: '2m ago',
      read: false
    },
    {
      id: 2,
      type: 'comment',
      username: 'CreativeMind',
      content: 'commented on your sketch "Abstract Thoughts"',
      timeAgo: '1h ago',
      read: false
    },
    {
      id: 3, 
      type: 'invite',
      username: 'DesignMaster',
      content: 'invited you to join the studio "Digital Dreamers"',
      timeAgo: '3h ago',
      read: false
    },
    {
      id: 4,
      type: 'mention',
      username: 'ColorExplorer',
      content: 'mentioned you in a comment',
      timeAgo: '1d ago',
      read: true
    }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? {...notification, read: true} : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({...notification, read: true})));
  };

  return (
    <div className={`min-h-screen pt-16 pb-20 md:pb-0 md:pt-24 ${themeClasses} canvas-bg`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-caveat font-bold">Notifications</h1>
          <button 
            onClick={markAllAsRead}
            className="text-sm text-primary hover:underline"
          >
            Mark all as read
          </button>
        </div>
        
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map(notification => (
              <HoverCard key={notification.id}>
                <HoverCardTrigger asChild>
                  <Card 
                    className={`sketch-card p-4 cursor-pointer transition duration-300 ${notification.read ? 'opacity-70' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${notification.read ? 'invisible' : 'bg-primary'}`}></div>
                      <div className="flex-1">
                        <p>
                          <span className="font-medium">@{notification.username}</span> {notification.content}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.timeAgo}</p>
                      </div>
                    </div>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">@{notification.username}</h4>
                      <p className="text-sm text-muted-foreground">
                        View the full notification or interact with this alert.
                      </p>
                      <div className="flex items-center pt-2">
                        <button className="text-xs text-primary hover:underline">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        ) : (
          <Card className="sketch-card p-6 text-center">
            <p className="text-muted-foreground py-10">No notifications yet</p>
          </Card>
        )}
        
        {/* Decorative elements */}
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="drip" 
            style={{ 
              right: `${20 + i * 20}%`, 
              height: `${8 + Math.random() * 12}px`,
              animationDelay: `${i * 0.3}s` 
            }}
          />
        ))}
      </div>
      <Navbar />
    </div>
  );
}

export default function NotificationsWithTheme() {
  return (
    <ThemeProvider>
      <NotificationsPage />
    </ThemeProvider>
  );
}
