import React from 'react';

import { Context as AuthContext } from '~/context/Auth';

import Spinner from '~/components/Spinner';
import { db } from '~/helpers/firebase';

export class Trips extends React.Component {
  state = {
    trips: [],
    loading: true,
  }

  async componentDidMount() {
    const query = await db.collection('trips').where('userId', '==', this.props.user.uid).get();

    const trips = [];
    query.forEach(doc => trips.push({
      id: doc.id,
      ...doc.data(),
    }));

    this.setState({
      loading: false,
      trips,
    });
  }

  render() {
    if (this.state.loading) return <Spinner />;

    return <React.Fragment>
      {this.state.trips.length > 0 && this.state.trips.map(trip => <div key={trip.id}>
        {trip.id}: {trip.name}
      </div>)}
    </React.Fragment>;
  }
}

export default props => <AuthContext.Consumer>
  {({ user }) => <Trips user={user} {...props} />}
</AuthContext.Consumer>;
