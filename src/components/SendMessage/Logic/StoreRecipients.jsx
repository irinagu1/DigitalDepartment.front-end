import { baseurl } from "../../../shared";

export default function storeRecipients(
  recipients,
  asRecipients,
  recipientsToCheck,
  letterId
) {
  let roles = [];
  let users = [];
  let rolesToCheck = [];
  let usersToCheck = [];

  function getRecipients() {
    //create array for roles
    if (recipients.roles|| recipients.roles.length != 0 ) {
      roles = recipients.roles.map((item) => item.id);
    }
    //create array for users
    if ( recipients.users || recipients.users.length != 0 ) {
      users = recipients.users.map((item) => item.id);
    }
  }
  function getRecipientsToCheck() {
    if (!asRecipients) {
      if ( recipientsToCheck.roles  || recipientsToCheck.roles.length != 0) {
        rolesToCheck = recipientsToCheck.roles.map((item) => item.id);
      }
      //create array for users
      if ( recipientsToCheck.users || recipientsToCheck.users.length != 0 ) {
        usersToCheck = recipientsToCheck.users.map((item) => item.id);
      }
    } else {
      rolesToCheck = roles;
      usersToCheck = users;
    }
  }

  const sendData = async () => {
    const resRec = await fetch(baseurl + "letters/StoreRecipients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        LetterId: letterId,
        RolesIds : roles,
        UsersIds: users,
        ToCheck: false,
      }),
    });
    if (!resRec.ok) throw resRec.status;

    const resToCheck = await fetch(baseurl + "letters/StoreRecipients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          LetterId: letterId,
          RolesIds : rolesToCheck,
          UsersIds: usersToCheck,
          ToCheck: true,
        }),
      });
      if (!resToCheck.ok) throw resToCheck.status;
    console.log("successfully stored recipients");
  };

  getRecipients();
  getRecipientsToCheck();
  sendData();
  
}
