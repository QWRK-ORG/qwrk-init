export default function TestMobilePage() {
    return (
        <div className='container p-4'>
            <h1 className='text-2xl font-bold mb-4'>Test Mobile Navigation</h1>
            <p className='mb-4'>
                This page is for testing the mobile navigation drawer. Resize your browser window to
                a mobile size (less than 768px) to see the hamburger menu in the top navigation.
                Click on it to open the mobile drawer.
            </p>
            <div className='p-4 border rounded-md'>
                <h2 className='text-lg font-semibold mb-2'>Instructions:</h2>
                <ol className='list-decimal pl-5 space-y-2'>
                    <li>Resize your browser to mobile width (less than 768px)</li>
                    <li>Look for the hamburger menu icon in the top right</li>
                    <li>Click the hamburger menu to open the drawer</li>
                    <li>Verify that navigation items, logo, and actions appear in the drawer</li>
                    <li>Click outside the drawer or press ESC to close it</li>
                </ol>
            </div>
        </div>
    )
}
