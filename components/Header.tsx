import FileUploader from "@/components/FileUploader";
import SearchBar from "@/components/SearchBar";

const Header = ({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) => {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 relative">
            <div className="relative">
              <SearchBar />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FileUploader ownerId={userId} accountId={accountId} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
