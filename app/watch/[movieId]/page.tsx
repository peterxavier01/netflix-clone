import PageContent from "../_components/PageContent";

interface WatchProps {
  params: {
    movieId: string;
  };
}

const Watch: React.FC<WatchProps> = ({ params: { movieId } }) => {
  return (
    <div className="h-screen w-screen bg-black">
      <PageContent movieId={movieId} />
    </div>
  );
};

export default Watch;
