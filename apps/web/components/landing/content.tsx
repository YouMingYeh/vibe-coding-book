import { Cpu, Lock, Sparkles, Zap } from 'lucide-react'

export default function ContentSection() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
                <div className="mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-balance text-4xl font-medium lg:text-5xl">From Idea to Production: Your Complete App Development Journey</h2>
                    <p>The Vibe Coding Book is your comprehensive guide to building real, production-ready applications. We cover everything from brainstorming your idea to deploying your first app, focusing on best practices and beautiful, custom designs that stand out from AI templates.</p>
                </div>
                <img className="rounded-(--radius) grayscale" src="https://images.unsplash.com/photo-1616587226960-4a03badbe8bf?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="team image" height="" width="" loading="lazy" />

                <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Zap className="size-4" />
                            <h3 className="text-sm font-medium">Brainstorm</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Learn to validate your ideas and turn concepts into viable product specifications with proven frameworks.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Cpu className="size-4" />
                            <h3 className="text-sm font-medium">Design</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Create beautiful, user-centered designs that feel custom and professional, not like cookie-cutter templates.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Lock className="size-4" />
                            <h3 className="text-sm font-medium">Develop</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Build with modern best practices, clean architecture, and production-ready code from day one.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-4" />
                            <h3 className="text-sm font-medium">Deploy</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Launch your app to the world with confidence using industry-standard deployment strategies and tools.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
