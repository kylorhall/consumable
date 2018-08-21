import React from 'react';
import { Link } from 'react-router-dom';

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

    // must iterate over query in this manner; it is not an array
    const trips = [];
    query.forEach(doc => trips.push({
      id: doc.id,
      ...doc.data(),
    }));

    this.setState({ loading: false, trips });
  }

  render() {
    if (this.state.loading) return <Spinner />;

    return <React.Fragment>
      {this.state.trips.length > 0 && this.state.trips.map(trip => <div key={trip.id}>
        <Link to={`/trips/${trip.id}`}>{trip.id}</Link>: {trip.name}
      </div>)}
    </React.Fragment>;
  }
}

export default props => <AuthContext.Consumer>
  {({ user }) => <Trips user={user} {...props} />}
</AuthContext.Consumer>;
