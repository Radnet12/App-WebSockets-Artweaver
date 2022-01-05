import { ButtonHTMLAttributes } from "react";

// Styles
import "./Button.scss";

type ButtonProps = {
    toolName: string;
    imgWidth: number;
    imgHeight: number;
    imgSrc: string;
    alt: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
    const {
        toolName,
        className = "",
        imgWidth = 25,
        imgHeight = 25,
        imgSrc = "",
        alt = "",
        ...rest
    } = props;

    return (
        <button
            className={
                toolName
                    ? `tool tool--${toolName} ${className}`
                    : `tool ${className}`
            }
            {...rest}
        >
            <img src={imgSrc} alt={alt} width={imgWidth} height={imgHeight} />
        </button>
    );
};
