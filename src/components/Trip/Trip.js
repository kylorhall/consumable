import React from 'react';

import { Context as AuthContext } from '~/context/Auth';

import Spinner from '~/components/Spinner';
import { db } from '~/helpers/firebase';

export class Trip extends React.Component {
  state = {
    trip: {},
    loading: true,
  }

  async componentDidMount() {
    const doc = await db.collection('trips').doc(this.props.match.params.id).get();

    if (!doc.exists) return this.setState({ loading: false, trip: {} });

    return this.setState({
      loading: false,
      trip: {
        id: doc.id,
        ...doc.data(),
      },
    });
  }

  canEdit = () => this.state.trip.userId === this.props.user.uid

  // NOTE: renderTrip consumes AuthContext.Consumer!
  renderTrip = () => {
    console.log('can edit?', this.canEdit());
    if (!this.state.trip.id && !this.props.user) return <h1>Not Found</h1>;
    if (!this.state.trip.id) return <h2>New trip!?</h2>;

    return <div>
      {this.state.trip.id}: {this.state.trip.name}
    </div>;
  }

  render() {
    if (this.state.loading) return <Spinner />;
    return this.renderTrip();
  }
}

export default props => <AuthContext.Consumer>
  {({ user }) => <Trip user={user} {...props} />}
</AuthContext.Consumer>;
