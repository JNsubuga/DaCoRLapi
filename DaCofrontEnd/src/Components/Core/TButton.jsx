import { Link } from "react-router-dom";

export default function TButton({
    color = 'indigo',
    to = '',
    circle = 'false',
    href = '',
    link = 'false',
    add = '',
    // edit = '',
    back = '',
    submit = '',
    target = "_blank",
    onClick = () => { },
    children
}) {
    let classes = [
        "flex",
        "whitespace-nowrap",
        // "text-lg",
        "w-auto",
        "items-center",
        "justify-center",
        "rounded-md",
        "px-2",
        "border-transparent"
    ]

    if (add || submit) {
        classes = [
            ...classes,
            "bg-green-700",
            "text-white",
            "hover:text-green-700",
            "hover:bg-green-100"
        ]
    }

    // if (edit) {
    //     classes = [
    //         ...classes,
    //         "bg-orange-500",
    //         "text-white",
    //         "rounded-md",
    //         "hover:text-orange-700",
    //         "hover:bg-orange-100"
    //     ]
    // }

    if (back) {
        classes = [
            ...classes,
            "bg-blue-500",
            "text-white",
            "hover:text-blue-700",
            "hover:bg-blue-100"
        ]
    }

    if (link || to != '') {
        // classes = [
        //     ...classes,
        //     "transition-colors",
        // ];
        switch (color) {
            case "indigo":
                classes = [
                    ...classes,
                    "text-indigo-500",
                    "bg-indigo-300",
                    "focus:border-indigo-500",
                    "hover:text-indigo-100",
                    "hover:bg-indigo-500"
                ];
                break;
            case "white":
                classes = [
                    ...classes,
                    "text-gray-800",
                    "border-b-2",
                    "border-gray-200",
                    "hover:text-gray-100",
                    "hover:bg-gray-400"
                ];
                break;
            case "gray":
                classes = [
                    ...classes,
                    "text-gray-100",
                    "border-b-2",
                    "bg-gray-400",
                    "hover:text-gray-400",
                    "hover:bg-gray-100"
                ];
                break;
            case "green":
                classes = [
                    ...classes,
                    "bg-green-700",
                    "text-white",
                    "hover:text-green-700",
                    "hover:bg-green-100"
                ];
                break;
            case "orange":
                classes = [
                    ...classes,
                    "bg-orange-500",
                    "text-white",
                    "mr-1",
                    "hover:text-orange-700",
                    "hover:bg-orange-100"
                ];
                break;
            case "red":
                classes = [
                    ...classes,
                    "text-red-100",
                    "bg-red-600",
                    "focus:border-red-500",
                    "hover:text-red-600",
                    "hover:bg-red-100"
                ];
                break;
            default:
                classes = [...classes];
                break;
        }
    } else {
        // classes = [
        //     ...classes,
        //     "text-white",
        //     "focus:ring-2",
        //     "focus:ring-offset-2"
        // ];
        switch (color) {
            case "indigo":
                classes = [
                    ...classes,
                    "text-indigo-600",
                    "hover:bg-indigo-700",
                    "focus:border-indigo-500",
                ];
                break;
            case "green":
                classes = [
                    ...classes,
                    "bg-green-700",
                    "text-white",
                    "hover:text-green-700",
                    "hover:bg-green-100"
                ];
                break;
            case "orange":
                classes = [
                    ...classes,
                    "bg-orange-500",
                    "text-white",
                    "hover:text-orange-700",
                    "hover:bg-orange-100"
                ];
                break;
            case "red":
                classes = [
                    ...classes,
                    "bg-orange-500",
                    "text-white",
                    "mr-1",
                    "hover:text-orange-700",
                    "hover:bg-orange-100"
                ];
                break;
            default:
                classes = [...classes];
                break;
        }
    }

    if (circle) {
        classes = [
            ...classes,
            "h-8",
            "w-8",
            "items-center",
            "justify-center",
            "rounded-full",
            "text-sm"
        ]
    } else {
        classes = [
            ...classes,
            "p-0",
            "py-2",
            "px-4"
        ];
    }

    return (
        <>
            {href && (
                <a href={href} className={classes.join(" ")} target={target}>
                    {children}
                </a>
            )}

            {to && (
                <Link to={to} className={classes.join(" ")}>
                    {children}
                </Link >
            )}

            {!href && !to && (
                <button onClick={onClick} className={classes.join(" ")}>
                    {children}
                </button>
            )}
        </>
    )
}