import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { FaImages } from "react-icons/fa";
import { Tooltip, IconButton, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="border border-r-slate-300 min-h-screen w-12 bg-slate-100">
            <div className="w-full text-center p-2 cursor-pointer">
                <BsThreeDotsVertical className="font-extrabold text-xl" />
            </div>
            <ul className="flex flex-col items-center gap-5 py-3">
                <li>
                    <Tooltip content="Edit Report">
                        <IconButton>
                            <MdEdit className="w-full text-2xl font-bold cursor-pointer" />
                           
                        </IconButton>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip content="Download Report">
                        <IconButton>
                            <IoMdDownload className="w-full text-2xl font-bold cursor-pointer" />
                        </IconButton>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip content="Upload Pictures">
                        <Link to="upload">
                        <IconButton color="white">
                            <FaImages className="w-full text-2xl font-bold cursor-pointer" />
                        </IconButton>
                        </Link>
                    </Tooltip>
                </li>
                
            </ul>

        </div>
    )
}

export default Sidebar