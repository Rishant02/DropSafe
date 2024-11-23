import { IconPhotoShield } from "@tabler/icons-react";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="bg-brand p-10 hidden w-1/2 items-center justify-center lg:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
          <div className="flex items-center gap-5">
            <IconPhotoShield
              color="white"
              size={64}
              className="h-auto"
              stroke={2}
            />
            <h1 className="h1 text-white">DropSafe</h1>
          </div>
          <div className="space-y-5 text-white">
            <h1 className="h1">A safe place to drop your files</h1>
            <p className="body-1">
              This is a place where you can store all your files.
            </p>
          </div>
          <Image
            className="h-auto w-auto transition-all hover:rotate-1 hover:scale-105"
            src={"/illustration.svg"}
            alt="files"
            width={342}
            height={342}
            priority
          />
        </div>
      </section>
      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg-py-0">
        <div className="mb-10 lg:hidden flex items-center gap-5">
          <IconPhotoShield
            className="text-brand h-auto w-[100px] lg:w-[150px]"
            stroke={2}
          />
          <h1 className="h1 text-brand">DropSafe</h1>
        </div>
        {children}
      </section>
    </div>
  );
};

export default Layout;
