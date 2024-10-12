export default function Layout({ children }) {
    return (
        <div
            className="w-full h-full flex flex-row text-center content-center items-center
        justify-center"
        >
            <div className="background absolute w-full h-screen bg-no-repeat z-[-1]"></div>
            {children}
        </div>
    )
}
