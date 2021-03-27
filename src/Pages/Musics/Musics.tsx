import { useRouteMatch, Route, Switch } from "react-router-dom";
import Page from "Components/Page";
import MusicsMain from "./subPages/MusicsMain";
import MusicDetails from "./subPages/MusicDetails";
const Musics: React.FC = () => {
  const match = useRouteMatch();
  return (
    <Page noPadding>
      <Switch>
        <Route path={match.path} exact component={MusicsMain} />
        <Route path={`${match.path}/:id`} component={MusicDetails} />
      </Switch>
    </Page>
  );
};

export default Musics;
