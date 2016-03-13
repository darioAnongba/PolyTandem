<?php
/**
 * Created by PhpStorm.
 * User: christophe
 * Date: 12.03.16
 * Time: 22:46
 */

namespace AppBundle\Entity;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class Discussion
 *
 * @ORM\Entity
 * @ORM\Table(name="discussions")
 * @ORM\HasLifecycleCallbacks()
 */
class Discussion
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="video_id", type="integer")
     * @Assert\Type(type="integer")
     */
    protected $videoID;

    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="User")
     */
    protected $host;

    /**
     * @var string
     *
     * @ORM\Column(name="host_speaks", type="string")
     * @Assert\Language()
     */
    protected $hostSpeaks;


    /**
     * @var string
     *
     * @ORM\Column(name="host_learns", type="string")
     * @Assert\Language()
     */
    protected $hostLearns;

    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="User")
     */
    protected $guest;

    /**
     * @var string
     *
     * @ORM\Column(name="state", type="string", nullable=true)
     */
    protected $state;


    public function __construct(User $host, $hostSpeaks, $hostLearns)
    {
        $this->host = $host;
        $this->hostSpeaks = $hostSpeaks;
        $this->hostLearns = $hostLearns;
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set videoID
     *
     * @ORM\PrePersist
     * @return Discussion
     */
    public function setVideoID()
    {
        $this->videoID = rand(100000000, 900000000);
        return $this;
    }

    /**
     * Get videoID
     *
     * @return integer
     */
    public function getVideoID()
    {
        return $this->videoID;
    }

    /**
     * Set hostSpeaks
     *
     * @param string $hostSpeaks
     *
     * @return Discussion
     */
    public function setHostSpeaks($hostSpeaks)
    {
        $this->hostSpeaks = $hostSpeaks;

        return $this;
    }

    /**
     * Get hostSpeaks
     *
     * @return string
     */
    public function getHostSpeaks()
    {
        return $this->hostSpeaks;
    }

   
    /**
     * Set state
     *
     * @param string $state
     *
     * @return Discussion
     */
    public function setState($state)
    {
        $this->state = $state;

        return $this;
    }

    /**
     * Get state
     *
     * @return string
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * Set host
     *
     * @param \AppBundle\Entity\User $host
     *
     * @return Discussion
     */
    public function setHost(\AppBundle\Entity\User $host = null)
    {
        $this->host = $host;

        return $this;
    }

    /**
     * Get host
     *
     * @return \AppBundle\Entity\User
     */
    public function getHost()
    {
        return $this->host;
    }

    /**
     * Set guest
     *
     * @param \AppBundle\Entity\User $guest
     *
     * @return Discussion
     */
    public function setGuest(\AppBundle\Entity\User $guest = null)
    {
        $this->guest = $guest;

        return $this;
    }

    /**
     * Get guest
     *
     * @return \AppBundle\Entity\User
     */
    public function getGuest()
    {
        return $this->guest;
    }
    

    /**
     * Set hostLearns
     *
     * @param string $hostLearns
     *
     * @return Discussion
     */
    public function setHostLearns($hostLearns)
    {
        $this->hostLearns = $hostLearns;

        return $this;
    }

    /**
     * Get hostLearns
     *
     * @return string
     */
    public function getHostLearns()
    {
        return $this->hostLearns;
    }
}
