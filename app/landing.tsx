"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Brain,
  Zap,
  BarChart3,
  Calendar,
  Stars,
  CheckCircle2,
  Award,
  Users,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
// @ts-ignore
import confetti from "canvas-confetti";

export default function LandingPage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const demoCards = [
    {
      question: "What is the powerhouse of the cell?",
      answer: "Mitochondria",
    },
    {
      question: "What is the largest planet in our solar system?",
      answer: "Jupiter",
    },
    {
      question: "What is the chemical symbol for gold?",
      answer: "Au",
    },
  ];

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % demoCards.length);
  };

  const handleEasy = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Trigger confetti celebration
    if (typeof window !== "undefined") {
      const rect = cardRef.current?.getBoundingClientRect();
      if (rect) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight,
          },
        });
      }
    }

    // Move to next card after a brief delay
    setTimeout(() => {
      handleNextCard();
    }, 1000);
  };

  const handleHard = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Trigger shake animation
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);

    // Move to next card after a brief delay
    setTimeout(() => {
      handleNextCard();
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Navbar */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
        <div className="container flex h-16 items-center justify-between px-4 max-w-full">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Zap className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">RecallMaster</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-primary"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-primary"
            >
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">Sign up free</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6 max-w-full">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
            <div className="flex flex-col justify-center space-y-4 max-w-[600px] mx-auto lg:mx-0">
              <div className="space-y-2">
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                  Master New Skills with Scientific Precision
                </h1>
                <p className="text-xl text-muted-foreground">
                  Remember{" "}
                  <span className="font-bold text-primary">4x more</span> using
                  spaced repetition. Join 100,000+ students and professionals
                  who have already transformed their learning.
                </p>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden"
                    >
                      <div className="h-full w-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                        {String.fromCharCode(64 + i)}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">4.9/5</span> from
                  2,000+ reviews
                </p>
              </div>

              {/* Primary CTA */}
              <div className="flex flex-col gap-2 min-[400px]:flex-row mt-6">
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="w-full min-[400px]:w-auto gap-1.5 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
                  >
                    Start Learning for Free
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full min-[400px]:w-auto"
                  >
                    See How It Works
                  </Button>
                </Link>
              </div>

              {/* Trust Factors */}
              <div className="flex flex-wrap gap-x-8 gap-y-3 mt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative h-[400px] w-[400px] md:h-[500px] md:w-[500px]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/5 to-background rounded-full blur-2xl opacity-50 animate-pulse"></div>
                {/* Interactive Flashcard */}
                <div
                  className={`relative z-10 p-4 perspective-1000 w-[320px] mx-auto`}
                >
                  <div
                    ref={cardRef}
                    className={`relative bg-card/80 backdrop-blur-sm border rounded-lg shadow-xl transform transition-all duration-500 preserve-3d cursor-pointer ${
                      isFlipped ? "rotate-y-180" : ""
                    } ${isShaking ? "animate-shake" : ""}`}
                    onClick={handleFlipCard}
                  >
                    {/* Front of card */}
                    <div
                      className={`bg-background p-6 rounded-md border backface-hidden ${
                        isFlipped ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <h3 className="font-bold text-lg mb-4">
                        Biology Flashcards
                      </h3>
                      <div className="bg-primary/5 p-5 rounded-md border border-primary/20 min-h-[140px] flex flex-col">
                        <div className="text-sm text-muted-foreground mb-2">
                          Question
                        </div>
                        <div className="font-medium text-lg">
                          {demoCards[cardIndex].question}
                        </div>
                        <div className="mt-auto pt-4">
                          <div className="h-0.5 w-full bg-muted"></div>
                          <div className="text-sm text-primary mt-2 font-medium flex items-center justify-center gap-2">
                            <span>Tap to reveal answer</span>
                            <ChevronRight className="h-4 w-4 animate-pulse-slow" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back of card */}
                    <div
                      className={`absolute inset-0 bg-background p-6 rounded-md border backface-hidden rotate-y-180 ${
                        isFlipped ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <h3 className="font-bold text-lg mb-4">
                        Biology Flashcards
                      </h3>
                      <div className="bg-green-50 dark:bg-green-950/20 p-5 rounded-md border border-green-200 dark:border-green-900 min-h-[140px] flex flex-col">
                        <div className="text-sm text-muted-foreground mb-2">
                          Answer
                        </div>
                        <div className="font-medium text-lg">
                          {demoCards[cardIndex].answer}
                        </div>
                        <div className="mt-auto pt-4 flex justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-950/30"
                            onClick={handleHard}
                          >
                            <ThumbsDown className="h-3 w-3" />
                            <span>Hard</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-950/30"
                            onClick={handleEasy}
                          >
                            <ThumbsUp className="h-3 w-3" />
                            <span>Easy</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card controls */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <span>
                        {cardIndex + 1}/{demoCards.length} cards
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full h-8 w-8 p-0"
                      onClick={handleNextCard}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="absolute bottom-8 -left-12 bg-card border rounded-lg shadow-lg p-3 transform -rotate-6 z-20 animate-bounce-slow">
                  <div className="text-primary font-bold flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    <span>Streak: 12 days!</span>
                  </div>
                </div>
                <div className="absolute top-10 right-0 bg-card border rounded-lg shadow-lg p-3 transform rotate-12 z-20">
                  <span className="text-lg font-bold text-primary">
                    +25 XP!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 bg-muted/50 border-y">
        <div className="container px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-full">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary">
              100k+
            </div>
            <div className="text-sm font-medium text-muted-foreground mt-1">
              Active Users
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary">
              10M+
            </div>
            <div className="text-sm font-medium text-muted-foreground mt-1">
              Cards Created
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary">
              85%
            </div>
            <div className="text-sm font-medium text-muted-foreground mt-1">
              Retention Rate
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary">
              4x
            </div>
            <div className="text-sm font-medium text-muted-foreground mt-1">
              Faster Learning
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-16 md:py-24">
        <div className="container px-4 md:px-6 max-w-full">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Powerful Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything You Need to <span className="text-primary">Excel</span>
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              RecallMaster combines cognitive science with smart technology to
              supercharge your learning
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex flex-col items-center space-y-4 rounded-lg border p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-md"
              >
                <div className="p-3 rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="w-full py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6 max-w-full">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Simple Process
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              How RecallMaster Works
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg/relaxed">
              Our scientifically proven process makes learning effortless and
              effective
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground">
                  <span className="text-lg font-bold">{i + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="w-full py-16 md:py-24">
        <div className="container px-4 md:px-6 max-w-full">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              User Stories
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              People Love RecallMaster
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg/relaxed">
              See what our users are saying about their experience
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="flex flex-col space-y-4 rounded-lg border p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <span className="font-medium">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <svg
                          key={i}
                          className="h-4 w-4 fill-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                  </div>
                  <p className="text-muted-foreground">{testimonial.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 max-w-full">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Start Your Learning Journey Today
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl/relaxed">
                Join thousands of students, professionals, and lifelong learners
                who are unlocking their full potential with RecallMaster.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-background text-primary hover:bg-background/90"
                >
                  Get Started Free
                </Button>
              </Link>
              <p className="text-sm mx-2 font-medium">
                No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-10 bg-background border-t">
        <div className="container px-4 md:px-6 max-w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Zap className="h-4 w-4" />
                </div>
                <span className="font-bold">RecallMaster</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The smarter way to remember everything you learn.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} RecallMaster. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0) rotate(-6deg);
          }
          50% {
            transform: translateY(-10px) rotate(-6deg);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 1.5s ease-in-out infinite;
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0) rotateY(180deg);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-5px) rotateY(180deg);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(5px) rotateY(180deg);
          }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        .backface-hidden {
          backface-visibility: hidden;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}

// Feature data
const features = [
  {
    icon: <Brain className="h-10 w-10 text-primary" />,
    title: "Spaced Repetition",
    description:
      "Our algorithm adapts to your learning pace, showing cards exactly when you need to review them.",
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "AI-Powered",
    description:
      "Generate flashcards automatically from your notes, textbooks, or any learning material.",
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    title: "Detailed Analytics",
    description:
      "Track your progress with comprehensive stats and visual reports.",
  },
  {
    icon: <Calendar className="h-10 w-10 text-primary" />,
    title: "Daily Streaks",
    description:
      "Stay motivated with streaks, challenges, and rewards for consistent practice.",
  },
  {
    icon: <Stars className="h-10 w-10 text-primary" />,
    title: "Multiple Learning Modes",
    description:
      "Learn with different modes: classic, quiz, matching, and typing response.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Collaborative Learning",
    description: "Share decks with friends or classmates and learn together.",
  },
];

// How it works steps
const steps = [
  {
    title: "Create",
    description:
      "Build your own flashcards or let AI generate them from your materials",
  },
  {
    title: "Practice",
    description: "Review cards with our optimized spaced repetition algorithm",
  },
  {
    title: "Master",
    description:
      "Watch your knowledge retention increase as you learn efficiently",
  },
];

// Testimonials
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Medical Student",
    text: "RecallMaster helped me memorize complex medical terms and concepts. My exam scores improved by 25% in just one month.",
  },
  {
    name: "James Lee",
    role: "Software Engineer",
    text: "I use RecallMaster to learn new programming languages. The AI card generator is a game-changer for technical content.",
  },
  {
    name: "Maria Rodriguez",
    role: "Language Learner",
    text: "Learning Spanish became so much easier with RecallMaster. I'm now conversational after just 3 months of daily practice.",
  },
];
