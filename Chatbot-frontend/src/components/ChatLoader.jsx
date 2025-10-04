/**
 * ChatLoader Component
 *
 * This component displays a loading animation with three bouncing dots, typically used to indicate 
 * that a response is being generated or awaited. The dots animate with a bounce effect, and the 
 * component is styled with inline CSS. The component includes inline styles for the loader, individual 
 * dots, and text, as well as custom keyframes for the bounce animation.
 *
 * Functionality:
 * - Displays three dots that animate with a bounce effect.
 * - The `dot1Style`, `dot2Style`, and `dot3Style` apply staggered animation delays to create the bouncing effect.
 * - The inline styles define the visual appearance of the dots and the loader container.
 * - Keyframes are defined to animate the bounce effect, moving the dots up and down.
 * - Can be used in chat interfaces or loading screens where a response is awaited.
 */
import React from 'react';

export default function ChatLoader(){
    // Inline styles for the loader and dots
    const loaderStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop:'2.1rem',
        height: '0.5rem', // Adjust height as needed
    };

    const dotStyle = {
        width: '0.6rem', // Size of the dots
        height: '0.6rem',
        margin: '0 5px', // Space between dots
        borderRadius: '50%',
        backgroundColor: 'blue', // Dot color
        animation: 'bounce 0.6s infinite alternate', // Animation
    };
    const LoadingResponse = {
        display:'flex',
        flexDirection:'row',
    }
    const textStyle = {
        fontSize:'1.1rem',
        color:'#003cb3'
    }
    const boldStyle={
        color:'#0000BE'
    }


    // Animation styles for each dot
    const dot1Style = { ...dotStyle, animationDelay: '0s' };
    const dot2Style = { ...dotStyle, animationDelay: '0.1s' };
    const dot3Style = { ...dotStyle, animationDelay: '0.2s' };
    
    return (
        <div style={LoadingResponse}>
                        <div style={loaderStyle}>
                            <div style={dot1Style}></div>
                            <div style={dot2Style}></div>
                            <div style={dot3Style}></div>
                        </div>
                </div>
    );
};

// Add keyframes for the bounce animation using a style tag
const style = document.createElement('style');
style.innerHTML = `
    @keyframes bounce {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-20px); /* Height of the bounce */
        }
    }
`;
document.head.appendChild(style);