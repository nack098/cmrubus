import DashboardNavigation from "./_components/DashboardNavigation"

export default function Layout({children}: React.PropsWithChildren) {
    return (
        <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-47%]">
            <div className="flex h-[53rem] w-[70rem]">
                <DashboardNavigation />
                {children}
            </div>
        </div>
    )
}