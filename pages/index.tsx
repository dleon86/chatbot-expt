import { Text, Page } from "@vercel/examples-ui";
import { Chat } from "../components/Chat";

function Home() {
    return (
        <Page className="flex flex-col h-full">
            <section className="flex flex-col gap-3 px-2 flex-auto">
                <Text variant="h2">TB Companion</Text>
                <div className="w-flex flex-grow bg-gray-300 rounded-3xl">
                    <Chat />
                </div>
            </section>
        </Page>
    );
}

export default Home;