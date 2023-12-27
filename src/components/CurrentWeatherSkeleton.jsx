import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CurrentWeatherSkeleton = () => {
	return (
		<div className="container flex flex-col max-w-4xl mx-auto my-10 bg-[#1C1C1E] rounded-2xl p-3">
			<h2 className="my-2 ml-4 font-saira text-white text-2xl">
				Current Weather
			</h2>
			<SkeletonTheme baseColor="#313131" highlightColor="#525252">
				<div className="flex gap-8">
					<div className="w-1/2 mb-4 ml-4 bg-[#1A191C] rounded-2xl relative p-8">
						<div className="flex items-center pb-3">
							<Skeleton circle width={25} height={25} />
							<Skeleton width={150} className="ml-2" />
						</div>
						<Skeleton count={3} className="mb-4" width={220} />
						<Skeleton
							circle
							width={100}
							height={100}
							className="absolute top-[50%] left-[80%] transform -translate-x-1/2 -translate-y-1/2"
						/>
					</div>
					<div className="w-1/2 mb-4 mr-4 grid grid-cols-2 grid-rows-2 gap-4 ">
						{Array.from({ length: 4 }, (_, index) => (
							<div
								key={index}
								className="bg-[#1A191C] rounded-2xl flex flex-col justify-center items-center"
							>
								<Skeleton
									circle
									width={30}
									height={30}
									className="m-2"
								/>
								<Skeleton width={100} />
								<Skeleton width={50} />
							</div>
						))}
					</div>
				</div>
			</SkeletonTheme>
		</div>
	);
};

export default CurrentWeatherSkeleton;
