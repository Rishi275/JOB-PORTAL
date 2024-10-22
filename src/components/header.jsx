import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';
import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";
import { useUser } from '@clerk/clerk-react';

export default function Header() {
    const [showSignIn, setShowSignIn] = useState(false); // Keep the same variable names
    const [search, setSearch] = useSearchParams();
    const { user } = useUser();

    useEffect(() => {
        if (search.get('sign-in')) {
            setShowSignIn(true);
        }
    }, [search]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowSignIn(false);
            setSearch({});
        }
    };

    return (
        <>
            <nav className='py-4 flex justify-between items-center'>
                <Link to="/">
                    <img src="/hirred.png" alt="logo" className='w-20' />
                </Link>

                <div className="flex gap-8">
                    {/* Clerk sign-in and sign-out logic */}
                    <SignedOut>
                        {/* Removed SignInButton to avoid duplication */}
                        <Button variant="outline" onClick={() => setShowSignIn(true)}>
                            Login
                        </Button>
                    </SignedOut>
                    <SignedIn>
                        {user?.unsafeMetadata?.role === "recruiter" && (
                            <Link to="/post-job">
                                <Button variant="destructive" className="rounded-full">
                                    <PenBox size={20} className="mr-2" /> Post a Job
                                </Button>
                            </Link>
                        )}
                        <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }}>
                            <UserButton.MenuItems>
                                <UserButton.Link
                                    label='My Jobs'
                                    href='/my-jobs'
                                    labelIcon={<BriefcaseBusiness size={15} />}
                                />
                                <UserButton.Link
                                    label='Saved Jobs'
                                    href='/saved-jobs'
                                    labelIcon={<Heart size={15} />}
                                />
                            </UserButton.MenuItems>
                        </UserButton>
                    </SignedIn>
                </div>
            </nav>
            
            {/* Sign-in overlay when triggered */}
            {showSignIn && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50' onClick={handleOverlayClick}>
                    <SignIn
                        signUpForceRedirectUrl="/onboarding"
                        fallbackRedirectUrl="/onboarding"
                    />
                </div>
            )}
        </>
    );
}
