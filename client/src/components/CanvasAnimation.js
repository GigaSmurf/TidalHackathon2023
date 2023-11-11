// components/CanvasAnimation.js
import React, { useEffect, useRef } from 'react';

const CanvasAnimation = ({ width, height }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Node class
        class Node {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.radius = Math.random() * 5 + 2;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#61dafb';
                ctx.fill();
                ctx.closePath();
            }

            update() {
                if (this.x + this.radius > width || this.x - this.radius < 0) {
                    this.speedX = -this.speedX;
                }
                if (this.y + this.radius > height || this.y - this.radius < 0) {
                    this.speedY = -this.speedY;
                }
                this.x += this.speedX;
                this.y += this.speedY;
                this.draw();
            }
        }

        // Create nodes
        const nodes = [];
        for (let i = 0; i < 50; i++) {
            nodes.push(new Node());
        }

        // Draw function
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            nodes.forEach(node => node.update());
            connectNodes();
            animationFrameId = window.requestAnimationFrame(draw);
        };

        // Connect nodes with distance of each other
        const connectNodes = () => {
            nodes.forEach((node, index) => {
                for (let i = index + 1; i < nodes.length; i++) {
                    const distance = Math.sqrt((nodes[i].x - node.x) ** 2 + (nodes[i].y - node.y) ** 2);
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(nodes[i].x, nodes[i].y);
                        ctx.strokeStyle = '#61dafb';
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            });
        };

        draw();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [width, height]);

    return <canvas ref={canvasRef} width={width} height={height} />;
};

export default CanvasAnimation;
