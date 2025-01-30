import { Link } from "react-router-dom";

const StoriesCards = () => {
    // const [stories, setStories] = useState([]);
    
    const storiesHeaderDataDummy = [
        {
            id: 1,
            title: "Story 1",
            content: "This is the content of story 1"
        },
        {
            id: 2,
            title: "Story 2",
            content: "This is the content of story 2"
        },
        {
            id: 3,
            title: "Story 3",
            content: "This is the content of story 3"
        },
        {
            id: 4,
            title: "Story 4",
            content: "This is the content of story 4"
        },
        {
            id: 5,
            title: "Story 5",
            content: "This is the content of story 5"
        }
    ];
    

    return (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {storiesHeaderDataDummy.map((story) => (
                    <Link to={`/stories/${story.id}`} key={story.id}>
                        <div className="flex flex-col items-center justify-center p-4 m-4 rounded-lg shadow-md bg-cream-white">
                            <h2>{story.title}</h2>
                            <p>{story.content}</p>
                        </div>
                    </Link>
                ))}
            </div>
    );
}

export default StoriesCards;
