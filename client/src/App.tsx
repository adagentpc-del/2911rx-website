import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Partnership from "@/pages/Partnership";
import HowItWorks from "@/pages/HowItWorks";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import AdminLogin from "@/pages/AdminLogin";
import AdminSetup from "@/pages/AdminSetup";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFound from "@/pages/NotFound";

// Privacy-friendly page-view tracking: no cookies, IP, or fingerprint.
function PageTracker() {
  const [loc] = useLocation();
  useEffect(() => {
    if (loc.startsWith("/admin")) return;
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "page_view", path: loc }),
      keepalive: true,
    }).catch(() => {});
  }, [loc]);
  return null;
}

export default function App() {
  return (
    <>
      <PageTracker />
      <Switch>
        <Route path="/admin" component={AdminLogin} />
        <Route path="/admin/setup" component={AdminSetup} />
        <Route path="/admin/inquiries" component={AdminDashboard} />
      <Route>
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/partnership" component={Partnership} />
            <Route path="/how-it-works" component={HowItWorks} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/terms" component={Terms} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
        </Route>
      </Switch>
    </>
  );
}
