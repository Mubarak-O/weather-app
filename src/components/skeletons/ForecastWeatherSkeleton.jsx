import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ForecastWeatherSkeleton = () => {
	return (
		<div className="container flex flex-col max-w-4xl mx-auto bg-[#1C1C1E] rounded-t-2xl rounded-b-md p-3">
			<h2 className="mt-2 ml-4 font-saira text-white text-2xl">
				Weekly Forecast
			</h2>
			<div className="scrollbar-container flex flex-row space-x-12 p-4 overflow-x-auto">
				<SkeletonTheme baseColor="#313131" highlightColor="#525252">
					{Array.from({ length: 7 }, (_, index) => (
						<div
							key={index}
							className="flex flex-col flex-shrink-0 w-[130px] items-center bg-[#1A191C] rounded-2xl p-4 space-y-5"
						>
							<div className="flex flex-col items-center space-y-1 ">
								<Skeleton width={50} height={30} />
								<Skeleton circle height={60} width={60} />
								<Skeleton width={40} />
							</div>
							<div className="flex flex-col items-start p-0.5 space-y-0.5">
								{Array.from({ length: 3 }, (_, index) => (
									<div
										key={index}
										className="flex flex-row items-center space-x-2"
									>
										<Skeleton
											circle
											height={20}
											width={20}
										/>
										<Skeleton width={40} />
									</div>
								))}
							</div>
						</div>
					))}
				</SkeletonTheme>
			</div>
		</div>
	);
};

export default ForecastWeatherSkeleton;
