import { Atom, MapPin, GraduationCap } from "lucide-react";

const features = [
    {
        icon: <Atom className="h-8 w-8 text-blue-500" />,
        title: "AI Chatbot Advisor",
        description: "Get personalized degree and career recommendations instantly powered by GPT-4.",
    },
    {
        icon: <MapPin className="h-8 w-8 text-green-500" />,
        title: "Kampus Kaltim Hub",
        description: "Deep dive into Universities in Kalimantan Timur. Local wisdom for local opportunities.",
    },
    {
        icon: <GraduationCap className="h-8 w-8 text-purple-500" />,
        title: "Scholarship Matcher",
        description: "Find scholarships that match your grades and background automatically.",
    },
];

export function Features() {
    return (
        <section id="features" className="container mx-auto py-20 px-4 bg-slate-50 dark:bg-slate-900/50 rounded-3xl my-10">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose EduPath?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    We bring together data, AI, and local insights to help you make the best decision for your higher education journey.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center p-6 bg-background rounded-xl shadow-sm border">
                        <div className="mb-4 p-3 bg-slate-100 rounded-full dark:bg-slate-800">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
