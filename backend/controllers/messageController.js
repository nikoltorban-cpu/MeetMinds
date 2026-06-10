import pool from "../config/db.js";

export const messages = async (req, res) => {
    try {
      const {
        senderId,

        receiverId,

        message,
      } = req.body;

      const newMessage = await pool.query(
        `INSERT INTO messages

          (sender_id, receiver_id, message)

          VALUES ($1, $2, $3)

          RETURNING *`,

        [senderId, receiverId, message],
      );

      
      const existingConversation = await pool.query(
          `SELECT * FROM conversations
          
          WHERE
          
          (user1_id = $1
          AND user2_id = $2)
          
          OR
          
          (user1_id = $2
          AND user2_id = $1)`,
          
          [senderId, receiverId],
        );
        
        if (existingConversation.rows.length > 0) {
            await pool.query(
                `UPDATE conversations
                
                SET last_message = $1,
                updated_at = CURRENT_TIMESTAMP
                
                WHERE id = $2`,
                
                [message, existingConversation.rows[0].id],
            );
        } else {
            await pool.query(
                `INSERT INTO conversations
                (user1_id,
                user2_id,
                last_message)
                
                VALUES ($1,$2,$3)`,
                
                [senderId, receiverId, message],
            );
        }
        res.json({
          message: "Message sent",
          data: newMessage.rows[0],
        });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server error",
      });
    }
}

export const conversations = async (req, res) => {
    try {
      const { userId } = req.params;

      const conversations = await pool.query(
        `SELECT conversations.*,

            users.id AS other_user_id,

            users.username

     FROM conversations

     JOIN users

     ON users.id =

       CASE

         WHEN conversations.user1_id = $1

         THEN conversations.user2_id

         ELSE conversations.user1_id

       END

     WHERE

       conversations.user1_id = $1

       OR

       conversations.user2_id = $1

     ORDER BY updated_at DESC`,

        [userId],
      );

      res.json(conversations.rows);
    } catch (error) {
      console.log(error);
    }
}

export const messagesBetweenUsers = async (req, res) => {
    try {
      const {
        user1,

        user2,
      } = req.params;

      const messages = await pool.query(
        `SELECT * FROM messages

           WHERE

           (sender_id = $1
            AND receiver_id = $2)

           OR

           (sender_id = $2
            AND receiver_id = $1)

           ORDER BY created_at ASC`,

        [user1, user2],
      );

      res.json(messages.rows);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server error",
      });
    }
}

export const markMessagesAsRead = async (req, res) => {
  try {
    const { userId, otherUserId } = req.body;

    await pool.query(
      `
      UPDATE messages
      SET is_read = true
      WHERE receiver_id = $1
      AND sender_id = $2
      AND is_read = false
      `,
      [userId, otherUserId]
    );

    res.json({
      message: "Messages marked as read",
    });
  } catch (error) {
    console.log(error);
  }
};

export const unreadMessagesCount = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `
      SELECT COUNT(*) AS count
      FROM messages
      WHERE receiver_id = $1
      AND is_read = false
      `,
      [userId]
    );

    res.json({
      count: Number(result.rows[0].count),
    });
  } catch (error) {
    console.log(error);
  }
};
