'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * A hook that prevents the user from accidentally navigating away or closing the tab
 * if there are unsaved changes in a form.
 * 
 * @param hasChanges - Boolean indicating if there are unsaved changes.
 */
export const useUnsavedChanges = (hasChanges: boolean) => {
    const [showModal, setShowModal] = useState(false);
    const isGuarded = useRef(false);

    useEffect(() => {
        // 1. Handle browser tab/window close (Standard Browser Dialog)
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        // 2. Handle Back Button (Internal Navigation Guard)
        const handlePopState = (e: PopStateEvent) => {
            if (hasChanges) {
                // Stay on current page by pushing state back
                // This "cancels" the back movement visually for the user
                window.history.pushState(null, '', window.location.href);
                setShowModal(true);
            } else {
                isGuarded.current = false;
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        if (hasChanges && !isGuarded.current) {
            // Push a "dummy" state to the history stack once
            window.history.pushState(null, '', window.location.href);
            window.addEventListener('popstate', handlePopState);
            isGuarded.current = true;
        }

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);

            // If we are unmounting and we had a guard, we don't necessarily want to pop it here
            // because Next.js handles route transitions.
        };
    }, [hasChanges]);

    const confirmLeave = useCallback(() => {
        setShowModal(false);
        isGuarded.current = false;
        // Move back twice: once for our dummy state, once for the actual navigation intent
        window.history.go(-2);
    }, []);

    const cancelLeave = useCallback(() => {
        setShowModal(false);
    }, []);

    return { showModal, confirmLeave, cancelLeave };
};
