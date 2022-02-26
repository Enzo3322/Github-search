import { useState } from 'react';
import { BsGithub, BsPinMapFill, BsFillPenFill } from 'react-icons/bs';
import {
	AiOutlineUser,
	AiOutlineClockCircle,
	AiOutlineGithub,
} from 'react-icons/ai';
import { GiMagnifyingGlass } from 'react-icons/gi';
import {
	RiGitRepositoryCommitsLine,
	RiUserFollowLine,
	RiUserFollowFill,
} from 'react-icons/Ri';
import { MdOutlineBusiness } from 'react-icons/Md';
import './App.scss';
import { formatDate } from './utils/formatDate';

function App() {
	const [userData, setUserData] = useState({});
	const [userName, setUserName] = useState(null);

	const getUserData = (username) => {
		fetch(`https://api.github.com/users/${username}`).then((response) => {
			response.json().then((data) => {
				setUserData(data);
			});
		});
	};

	return (
		<main className="container">
			<div className="subcontainer">
				<h1>Olá 👋, sejá bem vindo!</h1>
				<p>
					No campo abaixo insira o nome da conta no Github <BsGithub /> que
					deseja buscar informações.
				</p>

				<div className="search-container">
					<input
						type="text"
						name="username"
						id="githubuser"
						placeholder="Github username"
						onChange={(e) => setUserName(e.target.value)}
					/>
					<button
						onClick={() => {
							getUserData(userName);
						}}
					>
						Search <GiMagnifyingGlass />
					</button>
				</div>
			</div>

			{Object.keys(userData).length > 0 ? (
				<div className="user-data">
					<div className="box-1">
						<img
							src={userData?.avatar_url}
							width={120}
							alt=""
							className="img"
						/>
						<div className="infos">
							<p className="name">
								<AiOutlineUser />{' '}
								{userData?.name?.length > 0 ? userData?.name : 'Não informado'}
							</p>
							<p className="name">
								<AiOutlineGithub />{' '}
								{userData?.login?.length > 0
									? userData?.login
									: 'Não informado'}
							</p>
							<p className="repo">
								<RiGitRepositoryCommitsLine />
								{userData?.public_repos} Public Repos
							</p>
							<p className="company">
								<MdOutlineBusiness />{' '}
								{userData?.company?.length > 0
									? userData?.company
									: 'Não informado'}
							</p>
						</div>
					</div>
					<div className="box-2">
						<p className="followers">
							<span>
								<RiUserFollowFill />
								Followers: {userData?.followers}
							</span>
							<span>
								<RiUserFollowLine />
								Follows: {userData?.following}
							</span>
						</p>
						<p className="bio">
							<BsFillPenFill />
							{userData?.bio?.length > 0 ? userData?.bio : 'Não informado'}
						</p>

						<p className="activity">
							<span>
								<BsPinMapFill />
								{userData?.location?.length > 0
									? userData?.location
									: 'Não informado'}
							</span>
							<span>
								<AiOutlineClockCircle />{' '}
								{userData?.updated_at?.length > 0
									? formatDate(userData?.updated_at)
									: 'Não informado'}
							</span>
						</p>
					</div>
				</div>
			) : (
				''
			)}
			<footer>Developed by Enzo Spagnolli ✌️</footer>
		</main>
	);
}

export default App;
